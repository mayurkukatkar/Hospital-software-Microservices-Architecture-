package com.mayur.inventory.service;

import com.mayur.inventory.domain.InventoryItem;
import com.mayur.inventory.dto.InventoryDto;
import com.mayur.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Transactional
    public InventoryDto addItem(InventoryDto request) {
        if (inventoryRepository.findBySkuCode(request.getSkuCode()).isPresent()) {
            throw new IllegalArgumentException("Item with SKU " + request.getSkuCode() + " already exists.");
        }

        InventoryItem item = InventoryItem.builder()
                .skuCode(request.getSkuCode())
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .supplier(request.getSupplier())
                .location(request.getLocation())
                .build();

        item = inventoryRepository.save(item);
        log.info("Added Inventory Item: {}", item.getSkuCode());
        return mapToDto(item);
    }

    @Transactional
    public InventoryDto updateStock(String skuCode, int quantity) {
        InventoryItem item = inventoryRepository.findBySkuCode(skuCode)
                .orElseThrow(() -> new IllegalArgumentException("Item not found: " + skuCode));
        
        item.setQuantity(quantity);
        item = inventoryRepository.save(item);
        log.info("Updated Stock for {}: {}", skuCode, quantity);
        return mapToDto(item);
    }

    public List<InventoryDto> getAllItems() {
        return inventoryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private InventoryDto mapToDto(InventoryItem item) {
        return InventoryDto.builder()
                .id(item.getId())
                .skuCode(item.getSkuCode())
                .name(item.getName())
                .description(item.getDescription())
                .category(item.getCategory())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .supplier(item.getSupplier())
                .location(item.getLocation())
                .build();
    }
}

