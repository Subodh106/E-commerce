package com.backend.demo.Controller;
import com.backend.demo.Common.ApiResponse;
import com.backend.demo.Dto.Product.ProductRequestDto;
import com.backend.demo.Dto.Product.ProductResponseDto;
import com.backend.demo.Security.CustomUserDetails;
import com.backend.demo.Service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private  final ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(@Valid @ModelAttribute ProductRequestDto createProductDto, @AuthenticationPrincipal CustomUserDetails user ) throws IOException {
        ProductResponseDto response = productService.create(createProductDto, user.getId());

        ApiResponse<ProductResponseDto> productResponse = new ApiResponse<>("Product Created Successfully", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(productResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getAllProducts(@RequestParam(defaultValue = "10")int size ,@RequestParam(defaultValue = "0") int page , @RequestParam(defaultValue = "asc") String direction , @RequestParam(defaultValue = "name") String sortBy){
        List<ProductResponseDto> response = productService.getAllProducts(size , page , direction , sortBy);
        ApiResponse<List<ProductResponseDto>> productResponse = new ApiResponse<>("All products retrieved successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(productResponse);
    }
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductById(@PathVariable Long id){
        ProductResponseDto response = productService.getProductById(id);
        ApiResponse<ProductResponseDto> productResponse = new ApiResponse<>("Product retrieved successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(productResponse);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProductById(@PathVariable Long id){
        String response = productService.deleteProductById(id);
        ApiResponse<Void> productResponse = new ApiResponse<>(response,null);
        return ResponseEntity.status(HttpStatus.OK).body(productResponse);
    }
    @PutMapping("{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> replaceProduct(@RequestBody ProductRequestDto productRequestDto , @AuthenticationPrincipal CustomUserDetails user , @RequestParam Long productId) throws Exception {
        ProductResponseDto response = productService.replaceProduct(productRequestDto,productId);
        ApiResponse<ProductResponseDto> productResponse = new ApiResponse<>("Product replaced successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(productResponse);
    }
    @PatchMapping("{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(@RequestBody ProductRequestDto productRequestDto , @AuthenticationPrincipal CustomUserDetails user , @RequestParam Long productId) throws Exception {
        ProductResponseDto response = productService.updateProduct(productRequestDto,productId );
        ApiResponse<ProductResponseDto> productResponse = new ApiResponse<>("Product updated successfully",response);
        return ResponseEntity.status(HttpStatus.OK).body(productResponse);
    }
}