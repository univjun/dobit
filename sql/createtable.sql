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

ALTER TABLE bo_free_comment_re ADD reply_to VARCHAR(64) AFTER master_idx;

ALTER TABLE user_master ADD user_naver_id VARCHAR(64);




--Beer Table--

CREATE TABLE beer_master
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        beer_name VARCHAR(64) NOT NULL DEFAULT 'undefined',
        temp_class1 VARCHAR(64),
        temp_class2 VARCHAR(64),
        temp_class3 VARCHAR(64),
        temp_class4 VARCHAR(64),
        temp_info1 VARCHAR(255),
        temp_info2 VARCHAR(255),
        temp_info3 VARCHAR(255),
        temp_info4 VARCHAR(255),
        reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (idx)


    );

CREATE TABLE beer_evaluation
    (
        idx BIGINT NOT NULL AUTO_INCREMENT,
        beer_idx BIGINT,
        mem_idx BIGINT,
        temp_ev1 INT NOT NULL DEFAULT 0,
        temp_ev2 INT NOT NULL DEFAULT 0,
        temp_ev3 INT NOT NULL DEFAULT 0,
        temp_ev4 INT NOT NULL DEFAULT 0,
        temp_ev5 INT NOT NULL DEFAULT 0,
        reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (idx)
    )
