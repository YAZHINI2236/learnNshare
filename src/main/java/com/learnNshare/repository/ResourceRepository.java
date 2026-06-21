package com.learnNshare.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.learnNshare.entity.StudyResource;

public interface ResourceRepository
        extends JpaRepository<StudyResource, Long> {
	List<StudyResource> findBySubject(String subject);
	List<StudyResource> findBySemester(String semester);
	List<StudyResource> findByResourceType(String resourceType);
	List<com.learnNshare.entity.StudyResource>
	findByUploadedBy(Long uploadedBy);
}