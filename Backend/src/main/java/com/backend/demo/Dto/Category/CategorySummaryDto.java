package com.backend.demo.Dto.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CategorySummaryDto {
    private Long id;
    private String name;

    public CategorySummaryDto(Long id, String name) {
    }
}
