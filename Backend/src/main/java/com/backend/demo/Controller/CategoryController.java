package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Category.CategoryDto;
import com.backend.demo.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createCategory(@RequestBody CategoryDto categoryDto){

        ApiResponse<Void> categoryResponse = new ApiResponse<>("New category is created ",null);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryResponse);
    }
}
