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
    @GetMapping("/checkPoint")
    public Map<String,String> checkPoint(@Param("openid")String openid){
        Map<String,String>map = new HashMap<>();
        String temp = fileService.checkPoint(openid);
        map.put("result",temp);
        return map;
    }
    @PostMapping("/download")
    public void download(@Param("openid")String openid,@Param("fileID")String fileID){
        System.out.println(openid);
        fileService.download(openid,fileID);
    }

    @PostMapping("/uploads")
    @ResponseBody
    public String upload(
            @RequestParam("file") MultipartFile file,
            @Param("openid")String openid,
            @Param("college")String college,
            @Param("major")String major,
            @RequestParam("grade")String grade
    ) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        logger.info(college);
        String temp1 = file.getOriginalFilename();
        String temp= temp1.substring(temp1.lastIndexOf("."));
        String fileType =temp.substring(1,temp.length());
        String fileName = temp1.substring(0,temp1.length()-temp.length());
        System.out.println(temp);
        try {
            String filePath = ResourceUtils.getURL("classpath:").getPath()+"/document/";
            File dest = new File(filePath + fileName);
            file.transferTo(dest);
            logger.info("上传成功");
            fileService.upload(openid,college,major,grade,fileName,fileType);
            return "<script type=\"text/javascript\">" +
                    "alert(\"上传成功\")" +
                    "</script>";
        } catch (IOException e) {
            logger.error(e.toString(), e);
        }
        return "<script type=\"text/javascript\">" +
                "alert(\"上传失败\")" +
                "</script>";
    }
    @DeleteMapping("/delete")
    public void deleteFile(@Param("fileID")String fileID){
        fileService.deleteFile(fileID);
    }
    @GetMapping("/getCrodList")
    public Map<String,Object> getCrodList(@Param("openid")String openid){
        Map<String,Object>map = new HashMap<>();
        List<FileInfo> list = new ArrayList<>();
        list = fileService.getCrodList(openid);
        map.put("result",list);
        return map;
    }
    @GetMapping("/bestList")
    public Map<String,Object> getBestList(){
        Map<String,Object>map = new HashMap<>();
        List<FileInfo> list = new ArrayList<>();
        list = fileService.getBestList();
        map.put("result",list);
        return map;
    }
    @GetMapping("/getListByKey")
    public Map<String,Object> getBestList(@Param("data")String data){
        logger.info(data);
        Map<String,Object>map = new HashMap<>();
        List<FileInfo> list = new ArrayList<>();
        list = fileService.searchList(data);
        map.put("result",list);
        return map;
    }
}
