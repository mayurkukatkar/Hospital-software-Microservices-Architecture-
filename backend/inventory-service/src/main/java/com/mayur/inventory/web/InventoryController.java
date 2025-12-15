package com.mayur.inventory.web;

import com.mayur.inventory.dto.InventoryDto;
import com.mayur.inventory.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<InventoryDto> addItem(@Valid @RequestBody InventoryDto request) {
        return new ResponseEntity<>(inventoryService.addItem(request), HttpStatus.CREATED);
    }

    @PatchMapping("/items/{sku}/stock")
    public ResponseEntity<InventoryDto> updateStock(@PathVariable String sku, @RequestParam int quantity) {
        return ResponseEntity.ok(inventoryService.updateStock(sku, quantity));
    }

    @GetMapping("/items")
    public ResponseEntity<List<InventoryDto>> getAllItems() {
        return ResponseEntity.ok(inventoryService.getAllItems());
    }
}

