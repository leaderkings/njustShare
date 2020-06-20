package com.njustshare.demo.service;

import com.njustshare.demo.entity.FileInfo;

import java.util.List;

public interface FileService {
    List<FileInfo>getFileList(String college,String major,String grade);
}
