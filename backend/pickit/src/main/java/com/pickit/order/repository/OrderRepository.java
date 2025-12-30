package com.pickit.order.repository;

import com.pickit.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {


    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<Order> findByIdAndUserId(Long orderId, Long userId);

    @Query("""
    select distinct o
    from Order o
    join fetch o.orderItems oi
    join fetch oi.product p
    join fetch oi.inventory inv
    where o.id = :orderId and o.user.id = :userId
""")
    Optional<Order> findDetailByIdAndUserId(@Param("orderId") Long orderId, @Param("userId") Long userId);
}