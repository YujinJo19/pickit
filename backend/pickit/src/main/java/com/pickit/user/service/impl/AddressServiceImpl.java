package com.pickit.user.service.impl;

import com.pickit.global.exception.BusinessException;
import com.pickit.global.exception.ErrorCode;
import com.pickit.user.dto.AddressRequest;
import com.pickit.user.dto.AddressResponse;
import com.pickit.user.entity.Address;
import com.pickit.user.entity.User;
import com.pickit.user.repository.AddressRepository;
import com.pickit.user.repository.UserRepository;
import com.pickit.user.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public AddressResponse createAddress(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            addressRepository.clearDefaultByUserId(userId);
        }

        Address address = Address.builder()
                .user(user)
                .label(request.getLabel())
                .addressRaw(request.getAddressRaw())
                .city(request.getCity())
                .district(request.getDistrict())
                .neighborhood(request.getNeighborhood())
                .streetAddress(request.getStreetAddress())
                .zipCode(request.getZipCode())
                .recipientName(request.getRecipientName())
                .phone(request.getPhone())
                .isDefault(Boolean.TRUE.equals(request.getIsDefault()))
                .deliveryRequest(request.getDeliveryRequest())
                .build();

        Address saved = addressRepository.save(address);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    @Override
    public List<AddressResponse> getAddresses(Long userId) {
        return addressRepository.findByUserId(userId).stream().map(this::toResponse).toList();
    }

    @Transactional
    @Override
    public void deleteAddress(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId).orElseThrow(() -> new BusinessException(ErrorCode.ADDRESS_NOT_FOUND));

        addressRepository.delete(address);
    }

    @Transactional
    @Override
    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId).orElseThrow(() -> new BusinessException(ErrorCode.ADDRESS_NOT_FOUND));

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            addressRepository.clearDefaultByUserId(userId);
            address.setIsDefault(true);
        } else if (request.getIsDefault() != null) {
            address.setIsDefault(false);
        }
        address.setLabel(request.getLabel());
        address.setAddressRaw(request.getAddressRaw());
        address.setCity(request.getCity());
        address.setDistrict(request.getDistrict());
        address.setNeighborhood(request.getNeighborhood());
        address.setStreetAddress(request.getStreetAddress());
        address.setZipCode(request.getZipCode());
        address.setRecipientName(request.getRecipientName());
        address.setPhone(request.getPhone());
        address.setDeliveryRequest(request.getDeliveryRequest());

        Address saved = addressRepository.save(address);
        return toResponse(saved);
    }

    @Transactional
    @Override
    public AddressResponse setDefaultAddress(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId).orElseThrow(() -> new BusinessException(ErrorCode.ADDRESS_NOT_FOUND));

        // 이미 기본이면 그대로 반환
        if (Boolean.TRUE.equals(address.getIsDefault())) {
            return toResponse(address);
        }

        // 기존 기본 배송지 해제 후 현재 주소를 기본으로
        addressRepository.clearDefaultByUserId(userId);
        address.setIsDefault(true);

        Address saved = addressRepository.save(address);
        return toResponse(saved);
    }

    private AddressResponse toResponse(Address address) {
        return AddressResponse.builder().id(address.getId()).label(address.getLabel()).addressRaw(address.getAddressRaw()).city(address.getCity()).district(address.getDistrict()).neighborhood(address.getNeighborhood()).streetAddress(address.getStreetAddress()).zipCode(address.getZipCode()).recipientName(address.getRecipientName()).phone(address.getPhone()).isDefault(address.getIsDefault()).deliveryRequest(address.getDeliveryRequest()).build();
    }
}