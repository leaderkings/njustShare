package com.njustshare.demo.service.imp;

import com.njustshare.demo.dao.FileDao;
import com.njustshare.demo.entity.FileInfo;
import com.njustshare.demo.service.FileService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class FileServiceImp implements FileService {
    @Resource
    FileDao fileDao;

    @Override
    public List<FileInfo>getFileList(String college,String major,String grade){
        return fileDao.getFileList(college,major,grade);
    }
}
