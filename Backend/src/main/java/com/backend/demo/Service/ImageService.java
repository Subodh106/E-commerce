package com.backend.demo.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class ImageService {
    private final Cloudinary cloudinary;

    public String upload(MultipartFile file) throws IOException {
        try{
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()
            );
            return uploadResult.get("secure_url").toString();
        }catch (Exception e){
            throw new RuntimeException("Failed to upload image",e);
        }
    }
}
