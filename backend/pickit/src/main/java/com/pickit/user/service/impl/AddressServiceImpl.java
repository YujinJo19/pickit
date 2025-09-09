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
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public AddressResponse createAddress(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

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
                .isDefault(request.getIsDefault())
                .deliveryRequest(request.getDeliveryRequest())
                .build();
        if (request.getIsDefault() != null && request.getIsDefault()) {
            addressRepository.findByUserId(userId).stream()
                    .filter(Address::getIsDefault)
                    .forEach(addr -> {
                        addr.setIsDefault(false);
                        addressRepository.save(addr);
                    });
        }

        Address saved = addressRepository.save(address);

        return AddressResponse.builder()
                .id(saved.getId())
                .label(saved.getLabel())
                .city(saved.getCity())
                .zipCode(saved.getZipCode())
                .recipientName(saved.getRecipientName())
                .phone(saved.getPhone())
                .build();
    }

    @Override
    public List<AddressResponse> getAddresses(Long userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(address -> AddressResponse.builder()
                        .id(address.getId())
                        .label(address.getLabel())
                        .city(address.getCity())
                        .zipCode(address.getZipCode())
                        .recipientName(address.getRecipientName())
                        .phone(address.getPhone())
                        .build()
                ).toList();
    }

    @Override
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}
