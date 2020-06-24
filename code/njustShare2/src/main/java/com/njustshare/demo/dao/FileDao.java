package com.njustshare.demo.dao;

import com.njustshare.demo.entity.FileInfo;

import java.util.List;

public interface FileDao {
    List<FileInfo> getFileList(String college,String major,String grade);
    String checkPoint(String openid);
    void download(String openid);
    void incCount(String fileID);
    void upload(String openid);
    void addFile(String creatorID,String college,String major,String grade,String file_name,String file_type);
    void deleteFile(String fileID);
    List<FileInfo> getCrodList(String openid);
    List<FileInfo> getBestList();
    List<FileInfo> searchList(String data);
}
