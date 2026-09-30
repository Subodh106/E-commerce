package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Category.CategoryDto;
import com.backend.demo.Dto.Category.CategoryResponseDto;
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
    public ResponseEntity<ApiResponse<CategoryResponseDto>> createCategory(@RequestBody CategoryDto categoryDto){
        CategoryResponseDto response = categoryService.createCategory(categoryDto);
        ApiResponse<CategoryResponseDto> categoryResponse = new ApiResponse<>("New category is created ",response);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryResponse);
    }
}
