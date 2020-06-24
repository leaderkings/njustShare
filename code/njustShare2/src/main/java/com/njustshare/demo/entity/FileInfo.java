package com.njustshare.demo.entity;

public class FileInfo {
    public String fileID;
    public String file_name;
    public String creator_ID;
    public String college;
    public String file_path;
    public String file_type;
    public String downloadCount;

    public String getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(String downloadCount) {
        this.downloadCount = downloadCount;
    }

    public String getFile_name() {
        return file_name;
    }

    public String getCreator_ID() {
        return creator_ID;
    }

    public String getCollege() {
        return college;
    }

    public String getFile_path() {
        return file_path;
    }

    public String getFile_type() {
        return file_type;
    }


    public String getFileID() {
        return fileID;
    }

    public void setFileID(String fileID) {
        this.fileID = fileID;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public void setCreator_ID(String creator_ID) {
        this.creator_ID = creator_ID;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public void setFile_type(String file_type) {
        this.file_type = file_type;
    }
}
