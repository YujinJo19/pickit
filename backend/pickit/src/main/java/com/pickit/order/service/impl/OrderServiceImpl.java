package com.pickit.order.service.impl;

import com.pickit.cart.entity.Cart;
import com.pickit.cart.entity.CartItem;
import com.pickit.cart.repository.CartRepository;
import com.pickit.global.common.OrderStatus;
import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.order.dto.*;
import com.pickit.order.entity.Order;
import com.pickit.order.entity.OrderItem;
import com.pickit.order.repository.OrderRepository;
import com.pickit.order.service.OrderService;
import com.pickit.product.entity.Inventory;
import com.pickit.product.entity.Product;
import com.pickit.product.mapper.ProductMapper;
import com.pickit.product.repository.InventoryRepository;
import com.pickit.user.entity.Address;
import com.pickit.user.entity.User;
import com.pickit.user.repository.AddressRepository;
import com.pickit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final InventoryRepository inventoryRepository;
    private final OrderRepository orderRepository;

    @Override
    public OrderCreateResponse createOrder(Long userId, OrderCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CART_NOT_FOUND));

        List<CartItem> cartItems = cart.getItems();
        if (cartItems == null || cartItems.isEmpty()) {
            throw new BusinessException(ErrorCode.CART_EMPTY);
        }

        Address address = addressRepository.findByIdAndUserId(request.getAddressId(), userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ADDRESS_NOT_FOUND));

        Order order = Order.create(user, address);
        order.changeStatus(OrderStatus.CREATED);

        for (CartItem cartItem : cartItems) {
            int quantity = cartItem.getQuantity();

            Inventory inventory = inventoryRepository.findByIdForUpdate(cartItem.getInventory().getId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.INVENTORY_NOT_FOUND));
            if (inventory.getQuantity() < quantity) {
                throw new BusinessException(ErrorCode.INSUFFICIENT_STOCK);
            }

            inventory.decrease(quantity);

            Product product = cartItem.getProduct();
            Integer unitPrice = product.getPrice();
            Integer unitDiscountPrice = product.getDiscountPrice();

            OrderItem orderItem = OrderItem.create(
                    product,
                    inventory,
                    quantity,
                    unitPrice != null ? unitPrice : 0,
                    unitDiscountPrice
            );

            order.addOrderItem(orderItem);
        }

        Order saved = orderRepository.save(order);

        cart.clearItems();

        return OrderCreateResponse.builder()
                .orderId(saved.getId())
                .status(saved.getStatus())
                .totalPrice(saved.getTotalPrice())
                .build();

    }

    public OrderDetailResponse getOrderDetail(Long userId, Long orderId) {
        var order = orderRepository.findDetailByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ORDER_NOT_FOUND));

        var items = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .orderItemId(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .thumbnailUrl(ProductMapper.extractThumbnailUrl(item.getProduct()))
                        .color(item.getInventory().getColor())
                        .size(item.getInventory().getSize())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .unitDiscountPrice(item.getUnitDiscountPrice())
                        .lineTotal(item.getLineTotal())
                        .build())
                .collect(Collectors.toList());

        return OrderDetailResponse.builder()
                .orderId(order.getId())
                .status(order.getStatus())
                .totalPrice(order.getTotalPrice())
                .createdAt(order.getCreatedAt())
                .addressId(order.getAddress().getId())
                .items(items)
                .build();
    }

    public List<OrderListResponse> getMyOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(o -> OrderListResponse.builder()
                        .orderId(o.getId())
                        .status(o.getStatus())
                        .totalPrice(o.getTotalPrice())
                        .createdAt(o.getCreatedAt())
                        .build())
                .toList();
    }
}
