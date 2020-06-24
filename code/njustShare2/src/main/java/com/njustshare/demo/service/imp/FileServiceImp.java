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

    @Override
    public void download(String openid,String fileID){
        fileDao.download(openid);
        fileDao.incCount(fileID);
    }

    @Override
    public String checkPoint(String openid){
        String temp = fileDao.checkPoint(openid);
        if (temp == null) {
            temp = "no";
        }
        return temp;
    }
    @Override
    public void upload(String openid,String college,String major,String grade,String file_name,String file_type){
        fileDao.upload(openid);
        fileDao.addFile(openid,college,major,grade,file_name,file_type);
    }
    @Override
    public void deleteFile(String fileID){
        fileDao.deleteFile(fileID);
    }

    @Override
    public List<FileInfo> getCrodList(String openid){
        return fileDao.getCrodList(openid);
    }
    @Override
    public List<FileInfo> getBestList(){return fileDao.getBestList();}
    @Override
    public List<FileInfo> searchList(String data){return fileDao.searchList(data);}
}
