package com.backend.demo.Service;

import com.backend.demo.Dto.Image.ImageDto;
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

    public ImageDto upload(MultipartFile image) throws IOException {
        try{
            Map uploadResult = cloudinary.uploader().upload(
                    image.getBytes(),
                    ObjectUtils.emptyMap()
            );
            String imageUrl =  uploadResult.get("secure_url").toString();
            String publicId = uploadResult.get("public_id").toString();
            return new ImageDto(imageUrl,publicId);
        }catch (Exception e){
            throw new RuntimeException("Failed to upload image",e);
        }
    }

    public void delete(String publicId) {
        try {
            Map params =  ObjectUtils.asMap(
                    "invalidate",true
            );
            Map result = cloudinary.uploader().destroy(publicId,params);
            System.out.println(result);
        }catch(Exception e){
            throw new RuntimeException("Failed to delete image",e);
        }
    }
    public ImageDto update(String imagePublicID ,MultipartFile image) {
        try {
            ImageDto newImage = upload(image);
            delete(imagePublicID);
            return newImage;
        }catch (IOException e) {
            throw new RuntimeException("Filed to update image");
        }
        }
}
