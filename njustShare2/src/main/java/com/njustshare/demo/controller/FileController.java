package com.njustshare.demo.controller;

import com.njustshare.demo.entity.FileInfo;
import com.njustshare.demo.service.FileService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/file")
public class FileController {
    Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    FileService fileService;

    @GetMapping(value = "/fileList")
    public Map<String,Object> fileList(
            @Param("college")String college,
            @Param("major")String major,
            @Param("grade")String grade
    ){
        Map<String,Object>map = new HashMap<>();
        List<FileInfo> list = new ArrayList<>();
        list = fileService.getFileList(college,major,grade);
        map.put("result",list);
        return map;
    }

    @PostMapping("/uploads")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        try {
            String fileName = file.getOriginalFilename();
            String filePath = ResourceUtils.getURL("classpath:").getPath()+"/document/";
            File dest = new File(filePath + fileName);
            file.transferTo(dest);
            logger.info("上传成功");
            return "上传成功";
        } catch (IOException e) {
            logger.error(e.toString(), e);
        }
        return "上传失败！";
    }
}
