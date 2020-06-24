package com.njustshare.demo.service;

import com.njustshare.demo.entity.FileInfo;

import java.util.List;

public interface FileService {
    List<FileInfo>getFileList(String college,String major,String grade);
    String checkPoint(String openid);
    void download(String openid,String fileID);
    void upload(String openid,String college,String major,String grade,String file_name,String file_type);
    void deleteFile(String fileID);
    List<FileInfo> getCrodList(String openid);
    List<FileInfo> getBestList();
    List<FileInfo> searchList(String data);
}
