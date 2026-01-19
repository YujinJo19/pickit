package com.pickit.user.repository;

import com.pickit.user.entity.Address;
import com.pickit.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    // 특정 사용자의 모든 주소 조회
    List<Address> findByUserId(Long userId);

    // 특정 사용자의 기본 배송지 조회
    Optional<Address> findByUserAndIsDefaultTrue(User user);

    // 사용자 주소 단건 조회
    Optional<Address> findByIdAndUserId(Long addressId, Long userId);

    // 기존 기본 배송지 해제 (벌크 업데이트)
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update Address a set a.isDefault = false where a.user.id = :userId and a.isDefault = true")
    int clearDefaultByUserId(@Param("userId") Long userId);

    // 배송지 아이디 리스트로 배송지 삭제
    List<Address> findAllByIdInAndUserId(List<Long> ids, Long userId);
}
