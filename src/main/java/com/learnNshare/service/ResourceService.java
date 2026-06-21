package com.learnNshare.service;
import java.util.UUID;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.learnNshare.entity.StudyResource;
import com.learnNshare.repository.ResourceRepository;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public String uploadResource(
            String title,
            String subject,
            String semester,
            String resourceType,
            Long uploadedBy,
            MultipartFile file) throws IOException {

    	String originalFileName = file.getOriginalFilename();

    	String fileName = UUID.randomUUID() + "_" + originalFileName;

        Path uploadPath = Paths.get("uploads");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        StudyResource resource = new StudyResource();

        resource.setTitle(title);
        resource.setSubject(subject);
        resource.setSemester(semester);
        resource.setResourceType(resourceType);
        resource.setOriginalFileName(originalFileName);
        resource.setFileName(fileName);
        resource.setFilePath(filePath.toString());
        resource.setUploadedBy(uploadedBy);
        resource.setUploadDate(LocalDateTime.now());

        resourceRepository.save(resource);

        return "File Uploaded Successfully";
    }
    public List<StudyResource> getAllResources() {
        return resourceRepository.findAll();
    }
    public List<StudyResource> getResourcesBySubject(String subject) {
        return resourceRepository.findBySubject(subject);
    }
    public List<StudyResource> getResourcesBySemester(String semester) {
        return resourceRepository.findBySemester(semester);
    }
    public List<StudyResource> getResourcesByType(String resourceType) {
        return resourceRepository.findByResourceType(resourceType);
    }
    public Resource downloadFile(Long resourceId) throws Exception {

        StudyResource studyResource =
                resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource Not Found"));

        Path path = Paths.get(studyResource.getFilePath());

        return new UrlResource(path.toUri());
    }
    public String deleteResource(Long id) {

        resourceRepository.deleteById(id);

        return "Resource Deleted Successfully";
    }
    public List<com.learnNshare.entity.StudyResource>
    getResourcesByUser(Long userId) {

        return resourceRepository.findByUploadedBy(userId);
    }
}
