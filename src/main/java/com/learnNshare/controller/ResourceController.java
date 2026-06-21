package com.learnNshare.controller;

import java.io.IOException;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learnNshare.entity.StudyResource;
import com.learnNshare.service.ResourceService;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @PostMapping("/upload")
    public String uploadResource(
            @RequestParam String title,
            @RequestParam String subject,
            @RequestParam String semester,
            @RequestParam String resourceType,
            @RequestParam Long uploadedBy,
            @RequestParam MultipartFile file) throws IOException {

        return resourceService.uploadResource(
                title,
                subject,
                semester,
                resourceType,
                uploadedBy,
                file);
    }
    @GetMapping
    public List<StudyResource> getAllResources() {
        return resourceService.getAllResources();
    }
    @GetMapping("/subject/{subject}")
    public List<StudyResource> getBySubject(@PathVariable String subject) {

        return resourceService.getResourcesBySubject(subject);
    }
    @GetMapping("/semester/{semester}")
    public List<StudyResource> getBySemester(
            @PathVariable String semester) {

        return resourceService.getResourcesBySemester(semester);
    }
    @GetMapping("/type/{resourceType}")
    public List<StudyResource> getByType(
            @PathVariable String resourceType) {

        return resourceService.getResourcesByType(resourceType);
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id) throws Exception {

        Resource file = resourceService.downloadFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
    @DeleteMapping("/{id}")
    public String deleteResource(
            @PathVariable Long id) {

        return resourceService.deleteResource(id);
    }
    @GetMapping("/user/{userId}")
    public List<com.learnNshare.entity.StudyResource>
    getResourcesByUser(
            @PathVariable Long userId) {

        return resourceService.getResourcesByUser(userId);
    }
}