CREATE DATABASE yuniygeniy_crm;

\c yuniygeniy_crm

CREATE TABLE admin(
    admin_id serial PRIMARY KEY,
    admin_login VARCHAR(200) NOT NULL,
    admin_password VARCHAR(200) NOT NULL,
    admin_role VARCHAR(50) NOT NULL
);

CREATE TABLE teachers (
    teacher_id serial PRIMARY KEY,
    teacher_fullname VARCHAR(400) NOT NULL,
    teacher_date VARCHAR(400) NOT NULL,
    teacher_addres VARCHAR(400) DEFAULT NULL,
    teacher_number VARCHAR(400) NOT NULL, 
    teacher_role VARCHAR(200) NOT NULL
);

CREATE TABLE groups (
    group_id serial PRIMARY KEY,
    group_name VARCHAR(400) NOT NULL,
    group_teacher INT NOT NULL REFERENCES teachers(teacher_id) on delete cascade on update cascade,    
    group_assistent INT NOT NULL REFERENCES teachers(teacher_id) on delete cascade on update cascade    
);

CREATE TABLE children(
    child_id SERIAL PRIMARY KEY,
    child_name VARCHAR(300) NOT NULL,
    child_address VARCHAR(300) NOT NULL,
    child_date VARCHAR(300) NOT NULL,
    child_number VARCHAR(400) NOT NULL,
    child_source VARCHAR(400) NOT NULL,
    child_group INT NOT NULL REFERENCES groups(group_id) on delete cascade on update cascade
);


CREATE TABLE orders(
    order_id serial PRIMARY KEY,
    order_name VARCHAR(300) NOT NULL,
    order_age INT NOT NULL,
    order_number BIGINT NOT NULL,
    order_comment VARCHAR(300) NOT NULL
);


CREATE TABLE seasons (
    season_id serial PRIMARY KEY,
    season_name VARCHAR(200) NOT NULL
);


CREATE TABLE season_child (
    sch_id serial PRIMARY KEY,
    sch_child INT NOT NULL REFERENCES children(child_id) on delete cascade on update cascade,
    sch_season INT  NOT NULL REFERENCES season(season_id) on delete cascade on update cascade,
    sch_sum BIGINT,
    sch_payment VARCHAR(200) 
);


select c.child_name, n.season_name, g.group_name, s.sch_sum, s.sch_payment from children c left join season_child s on c.child_id = s.sch_child 
inner join seasons n on n.season_id = s.sch_season 
inner join groups g on g.group_id = c.child_group
where s.sch_season = 12 And s.sch_sum is not null;

update season_child set sch_sum = 2500000, sch_payment = 'terminal' where sch_id = 37;

select t.teacher_fullname, t.teacher_date, t.teacher_addres, t.teacher_number, g.group_name from teachers t inner join groups g on t.teacher_id  = g.group_teacher;

select g.group_name, ARRAY_AGG(t.teacher_fullname), count(ch.child_name) from groups g inner join teachers t on t.teacher_id = g.group_teacher
inner join children ch on g.group_id  = ch.child_group GROUP BY g.group_name;

select ch.child_name, ch.child_address, ch.child_number, g.group_name, ch.child_source from children ch inner join groups g on ch.child_group = g.group_id;




select c.child_name, n.season_name, s.sch_sum, s.sch_payment from children c left join season_child s on c.child_id = s.sch_child 
inner join seasons n on n.season_id = s.sch_season 
where s.sch_season = 12  And s.sch_sum is not null And c.child_group = $1;