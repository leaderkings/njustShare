package com.njustshare.demo.controller;

import com.njustshare.demo.entity.FileInfo;
import com.njustshare.demo.service.FileService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/file")
public class FileController {

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
}
