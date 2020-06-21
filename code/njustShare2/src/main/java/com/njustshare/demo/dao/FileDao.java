package com.njustshare.demo.dao;

import com.njustshare.demo.entity.FileInfo;

import java.util.List;

public interface FileDao {
    List<FileInfo> getFileList(String college,String major,String grade);
}
