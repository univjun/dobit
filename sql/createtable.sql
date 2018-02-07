CREATE TABLE bo_trend_master
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL DEFAULT '제목 없음',
        contents TEXT,
        writer_id INT NOT NULL,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        hit INT NOT NULL DEFAULT 0,
        up INT NOT NULL DEFAULT 0,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );




CREATE TABLE bo_free_master
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL DEFAULT '제목 없음',
        contents TEXT,
        writer_id INT NOT NULL,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        hit INT NOT NULL DEFAULT 0,
        up INT NOT NULL DEFAULT 0,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );




CREATE TABLE bo_trend_master
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL DEFAULT '제목 없음',
        contents TEXT,
        writer_id INT NOT NULL,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        hit INT NOT NULL DEFAULT 0,
        up INT NOT NULL DEFAULT 0,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );

CREATE TABLE bo_free_comment
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        writer_id INT NOT NULL,
        contents TEXT,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        up INT NOT NULL DEFAULT 0,
        master_idx INT NOT NULL,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );

CREATE TABLE bo_trend_comment
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        writer_id INT NOT NULL,
        contents TEXT,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        up INT NOT NULL DEFAULT 0,
        master_idx INT NOT NULL,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );

ALTER TABLE bo_free_master DROP COLUMN writer;
ALTER TABLE bo_free_master ADD COLUMN writer_id INT NOT NULL AFTER title;


CREATE TABLE bo_trend_comment_re
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        writer_id INT NOT NULL,
        contents TEXT,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        up INT NOT NULL DEFAULT 0,
        comment_idx INT NOT NULL,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );

CREATE TABLE bo_free_comment_re
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        writer_id INT NOT NULL,
        contents TEXT,
        reg_date TIMESTAMP NOT NULL DEFAULT 0,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        up INT NOT NULL DEFAULT 0,
        comment_idx INT NOT NULL,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)
    );


    ALTER TABLE bo_free_comment_re ADD master_idx BIGINT AFTER comment_idx;
    ALTER TABLE bo_free_master ADD down BIGINT NOT NULL DEFAULT 0 AFTER up;
    ALTER TABLE bo_free_master DROP COLUMN down;


        CREATE TABLE bo_free_up (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        master_idx INT NOT NULL,
        up_user_idx BIGINT NOT NULL,
        reg_date TIMESTAMP NOT NULL,
        edit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        temp1 VARCHAR(255),
        temp2 VARCHAR(255),
        temp3 VARCHAR(255),
        temp4 VARCHAR(255),
        PRIMARY KEY(idx)

        )