package com.backend.demo.Controller;

import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Category.CategoryDto;
import com.backend.demo.Dto.Category.CategoryResponseDto;
import com.backend.demo.Service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponseDto>> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        System.out.println("Create route");
        CategoryResponseDto response = categoryService.createCategory(categoryDto);
        ApiResponse<CategoryResponseDto> categoryResponse = new ApiResponse<>("New category is created ", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryResponse);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponseDto>>> getAllCategory(){
        List<CategoryResponseDto> response = categoryService.getAllCategory();
        ApiResponse<List<CategoryResponseDto>> categoryResponse = new ApiResponse<>("All category is fetched successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(categoryResponse);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long categoryId){
        categoryService.deleteCategory(categoryId);
        ApiResponse<Void> categoryResponse = new ApiResponse<>("Category is deleted successfully",null);
        return ResponseEntity.status(HttpStatus.OK).body(categoryResponse);
    }
}
