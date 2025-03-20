package com.pickit.user.repository;

import com.pickit.user.entity.Address;
import com.pickit.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    // 특정 사용자의 모든 주소 조회
    List<Address> findByUser(User user);

    // 특정 사용자의 기본 배송지 조회 (isDefault = true)
    Optional<Address> findByUserAndIsDefaultTrue(User user);
}
