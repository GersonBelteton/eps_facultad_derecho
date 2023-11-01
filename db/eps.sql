create database if not exists epsProyect;

use epsProyect; 

create table estudiante(
	nombre varchar(100),
    registro_academico varchar(10) primary key,
    unidad_academica varchar(2),
    extension varchar(2),
    carrera varchar(3),
    pin varchar(10)
);

create table unidad_academica (
	id int primary key auto_increment,
    nombre varchar(100) not null,
    codigo varchar(2) not null,
    abreviatura varchar(15)
);

create table extension_universitaria (
	id int primary key auto_increment,
    nombre varchar(100),
    codigo varchar(2) not null,
    id_ua int not null,
    foreign key(id_ua) references unidad_academica(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE 
);



create table carrera (
	id int primary key auto_increment,
    nombre varchar(100) not null,
	codigo varchar(2) not null,
    id_eu int not null,
    foreign key(id_eu) references extension_universitaria(id)
    ON DELETE CASCADE
	ON UPDATE CASCADE 
);

create table homologacion (
	id int primary key auto_increment,
    codigo_carrera int not null,
    id_ua int not null,
    foreign key(id_ua) references unidad_academica(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(codigo_carrera) references carrera(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

create table asignatura (
	id int primary key auto_increment,
    nombre varchar(100) not null,
    codigo_carrera int not null,
    codigo_asignatura varchar(3),
    foreign key(codigo_carrera) references carrera(id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

create table equivalencia (
	id int primary key auto_increment,
    codigo_asignatura1 int not null,
    codigo_asignatura2 int not null,
    foreign key(codigo_asignatura1) references asignatura(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
	foreign key(codigo_asignatura2) references asignatura(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists detalle_solicitud;
drop table if exists solicitud;
create table solicitud (
	id int primary key auto_increment,
    estudiante varchar(100) not null,
    registro_academico varchar(10) not null,
    cui_pasaporte varchar(15),
    tipo varchar(50), -- equivalencia o convalidacion
    estado varchar(50), -- activo, revisado o no revisado
    ruta_certificado_cursos varchar(500), -- ruta almacenamiento de documento
    resultado varchar(50), -- aprobado, rechazado
    fecha_inicio datetime, 
    fecha_final datetime,
    ruta_certificado_aprobacion varchar(500),
    descripcion varchar(500),
    codigo_carrera int not null,
    foreign key(codigo_carrera) references carrera(id)
    
);




create table detalle_solicitud(
	id int primary key auto_increment,
    id_solicitud int not null,
    codigo_asignatura int not null,
    foreign key(id_solicitud) references solicitud(id)
    ON  DELETE CASCADE ON  UPDATE CASCADE,
    foreign key(codigo_asignatura) references asignatura(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

create table administrador(
	id int primary key auto_increment,
    nombre_completo varchar(100) not null,
    usuario varchar(50) not null,
    contrasena varchar(50) not null,
    permiso_usuarios boolean,
    permiso_equivalencias boolean,
    permiso_expedientes boolean
);

create table permiso (
	id int primary key auto_increment,
    permiso varchar(50) not null
);

create table detalle_permiso (
	id int primary key auto_increment,
    id_permiso int not null,
    id_administrador int not null,
    foreign key(id_permiso) references permiso(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(id_administrador) references administrador(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

create table previo(
	id int primary key auto_increment,
    descripcion varchar(500)
);

create table detalle_previo(
	id int primary key auto_increment,
    id_previo int not null,
    id_solicitud int not null,
	foreign key(id_previo) references previo(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(id_solicitud) references solicitud(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

insert into unidad_academica(codigo, nombre) values
("04","Facultad de ciencias jurídicas y sociales"              ),
("12","Centro universitario de occidente (CUNOC)"              ),
("17","Centro universitario del norte (CUNOR)"                 ),
("19","Centro universitario de oriente (CUNORI)"               ),
("20","Centro universitario de noroccidente (CUNOROC)"         ),
("21","Centro universitario del sur (CUNSUR)"                  ),
("22","Centro universitario del sur-occidente (CUNSUROC)"      ),
("23","Centro universitario del sur-oriente (CUNSURORI)"       ),
("25","Centro universitario de San Marcos (CUSAM)"             ),
("27","Centro universitario de Izabal (CUNIZAB)"               ),
("32","Centro universitario de Santa Rosa (CUNSARO)"           ),
("34","Centro universitario de Jutiapa (JUSAC)"                ),
("35","Centro universitario de Chimaltenango (CUNDECH)"        ),
("37","Centro universitario de Baja Verapaz (CUNBAV)"          ),
("38","Centro universitario de El Progreso (CUN Progreso)"     ),
("39","Centro universitario de Totonicapán (CUNTOTO)"          ),
("40","Centro universitario de El Quiché (CUSACQ)"             ),
("41","Centro universitario de Zacapa (CUNZAC)"                ),
("42","Centro universitario de Sololá (CUNSOL)"                ),
("44","Centro universitario de Sacatepequez (CUNSAC)"		   );

select * from unidad_academica;

insert into extension_universitaria (id_ua, codigo, nombre)values
(1,"00","Campus Central"),
(2,"00","CUNOC"),
(3,"00","CUNOR"),
(4,"00","CUNORI"),
(5,"00","CUNOROC"),
(6,"00","CUNSUR"),
(7,"00","CUNSUROC"),
(8,"00","CUNSURORI"),
(8,"08","Mataquescuintla"),
(9,"00","CUSAM"),
(10,"00","Puerto Barrios"),
(11,"00","CUNSARO"),
(11,"05","Chiquimulilla"),
(11,"08","Nueva Santa Rosa"),
(12,"00","JUSAC"),
(13,"00","CUNDECH"),
(14,"00","CUNBAV"),
(15,"00","CUN Progreso"),
(16,"00","CUNTOTO"),
(17,"00","Santa Cruz El Quiché"),
(17,"10","Pachalún"),
(17,"12","Joyaba"),
(17,"11","Ixcán"),
(18,"00","CUNZAC"),
(19,"00","Sololá"),
(19,"05","San Juan la Laguna"),
(20,"00","CUNSAC");

select * from extension_universitaria;

insert into carrera (id_eu, codigo, nombre)values
(1,"01","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(2,"01","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(3,"13","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(4,"14","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(5,"09","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(6,"11","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(7,"17","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(8,"10","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(9,"10","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(10,"09","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(11,"06","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(12,"05","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(13,"05","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(14,"05","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(15,"02","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(16,"02","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(17,"03","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(18,"04","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(19,"06","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(20,"03","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(21,"03","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(22,"03","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(23,"03","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(24,"05","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(25,"01","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(26,"01","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado"),
(27,"05","Lic. en Ciencias Jurídicas y Sociales, Abogacia y Notariado");

select * from carrera;
																	


insert into asignatura (nombre, codigo_carrera, codigo_asignatura) values 
("Teoria de investigacion",1,"1"),("Economia",1,"2"),("Ciencia politica",1,"3"),
('Métodos y técnicas de investigación social',1,"4"),('Historia Juridico Social de Guatemala',1,"5"),
('Derecho Romano',1,"6"),('Filosofia',1,"7"),
("Teoria de investigacion",2,"1"),("Economia",2,"2"),
("Ciencia politica",2,"3"),('Métodos y técnicas de investigación social',2,"4"),
('Historia Juridico Social de Guatemala',2,"5"),('Derecho Romano',2,"6"),
('Filosofia',2,"7"),("Teoria de investigacion",3,"4"),
("Economia",3,"1"),("Economia 2",3,"2"),
("Ciencia politica",3,"3"),('Métodos y técnicas de investigación social',3,"4"),
('Historia Juridico Social de Guatemala',3,"5"),('Derecho Romano',3,"6"),
('Filosofia',3,"7"),("Teoria de investigacion",4,"1"),
("Economia",4,"4"),("Economia 2",4,"2"),
("Ciencia politica",4,"3"),("Ciencia politica 2",4,"4"),
('Métodos y técnicas de investigación social',4,"5"),('Historia Juridico Social de Guatemala',4,"6"),
('Derecho Romano',4,"7"),('Filosofia',4,"8");


insert into centro_universitario (nombre, unidad_academica, extension_universitaria, abreviatura) 
VALUES("centro universitario del sur", 23, 23, "CUNSUR");
insert into carrera (nombre, codigo_cu) values ('licenciatura en ciencias juridicas y sociales', 2);
insert into carrera (nombre, codigo_cu) values ('licenciatura en ciencias juridicas y sociales', 3);
insert into carrera (nombre, codigo_cu) values ('licenciatura en ciencias juridicas y sociales CUNSUR', 1);

insert into asignatura (nombre, codigo_carrera) values ('matematica', 2);
insert into asignatura (nombre, codigo_carrera) values ('historia', 2);
insert into asignatura (nombre, codigo_carrera) values ('historia', 1);
insert into equivalencia (codigo_asignatura1, codigo_asignatura2) values (4, 5);
insert into solicitud
(estudiante, registro_academico, tipo, estado, ruta_certificado_cursos, fecha_inicio, codigo_carrera)
values('Gerson Belteton', '201807228', 'equivalencia', 'NR', 'ruta', now(), 1);
insert into solicitud
(estudiante, registro_academico, tipo, estado, ruta_certificado_cursos, fecha_inicio, codigo_carrera)
values('Gerson Belteton', '201807228', 'equivalencia', 'NR', 'ruta', now(), 1);
insert into solicitud
(estudiante, registro_academico, tipo, estado, ruta_certificado_cursos, fecha_inicio, codigo_carrera)
values('Juan Lopez', '201505998', 'equivalencia', 'NR', 'ruta', now(), 2);

insert into estudiante values("Juan Alberto Escobar Fernandez","201708265","04","00","01","12345");
insert into estudiante values("Alejandro Matias Diaz Gonzalez","201805647","38","00","04","12345");
insert into estudiante values("Rodolfo de Jesus Rodriguez Lopez","201609876","12","00","01","12345");
insert into estudiante values("Juan Antonia Gomez Bolaños","201405879","12","00","01","12345");
select * from estudiante;
truncate table estudiante;

insert into administrador(nombre_completo, usuario, contrasena, permiso_usuarios, permiso_equivalencias, permiso_expedientes) 
values ("Valeska Ruiz", "VRuiz", "123", true, true, true );
insert into administrador(nombre_completo, usuario, contrasena) values ("Roberto Fernandez", "Rfernandez", "123");
select * from administrador;

update solicitud set resultado='aprobado', fecha_final=now() where id = 1;
update solicitud set estado='DPP' where id = 2;


delete from solicitud where id = 1;

select * from unidad_academica where codigo != '04';
select * from unidad_academica where codigo = '04';

(select * from equivalencia inner join asignatura on codigo_asignatura2 = asignatura.id where codigo_asignatura1 = 4 and codigo_carrera = 1)
union
(select * from equivalencia inner join asignatura on codigo_asignatura1 = asignatura.id where codigo_asignatura2 = 4 and codigo_carrera = 1);

select * from asignatura inner join carrera on asignatura.codigo_carrera = carrera.id;

insert into equivalencia (codigo_asignatura1, codigo_asignatura2) values(1,8),(2,9);
insert into equivalencia (codigo_asignatura1, codigo_asignatura2) values(11,1);
select * from equivalencia;

insert into previo (descripcion) value("No cargó certificado de cursos"),("seleccion de cursos erronea");
insert into previo (descripcion) value("certificado de cursos no actualizado");

select previo.id, previo.descripcion from previo inner join detalle_previo on detalle_previo.id_previo = previo.id
        inner join solicitud on solicitud.id = detalle_previo.id_solicitud  where solicitud.id = 2;
        
select * from previo;
select * from detalle_previo;
select asignatura.id, nombre, codigo_carrera, codigo_asignatura from equivalencia inner join asignatura on codigo_asignatura2 = asignatura.id 
where codigo_asignatura1 = 1 and codigo_carrera = 2
union
select asignatura.id, nombre, codigo_carrera, codigo_asignatura from equivalencia inner join asignatura on codigo_asignatura1 = asignatura.id 
where codigo_asignatura2 = 1 and codigo_carrera = 2;

select * from asignatura where codigo_carrera = 2 
and nombre not in(
select  nombre from equivalencia inner join asignatura on codigo_asignatura2 = asignatura.id 
where codigo_asignatura1 = 1 and codigo_carrera = 2
union
select  nombre  from equivalencia inner join asignatura on codigo_asignatura1 = asignatura.id 
where codigo_asignatura2 = 1 and codigo_carrera = 2
);

-- obtener carrera actual del estudiante
select distinct unidad_academica.nombre as unidad_nombre, carrera.id, carrera.nombre as carrera_nombre, carrera.codigo from carrera 
inner join asignatura on asignatura.codigo_carrera = carrera.id
inner join detalle_solicitud on detalle_solicitud.codigo_asignatura = asignatura.id
inner join solicitud on solicitud.id = detalle_solicitud.id_solicitud 
inner join extension_universitaria on carrera.id_eu = extension_universitaria.id
inner join unidad_academica on unidad_academica.id = extension_universitaria.id_ua
where solicitud.id = 1;






select * from solicitud where registro_academico = '201807228';
select * from solicitud;
select * from detalle_solicitud;
select * from carrera;
select * from asignatura;
SELECT * FROM centro_universitario;
select * from equivalencia;

select * from carrera where codigo_cu = 1;

select * from estudiante;
delete from carrera where codigo = 3;

select * from carrera inner join centro_universitario on centro_universitario.id = carrera.codigo_cu 
where codigo_carrera = '08' and unidad_academica = '00' and extension_universitaria = '00';

select carrera.id, carrera.codigo as codigo_carrera, carrera.nombre as nombre_carrera, 
extension_universitaria.id, extension_universitaria.codigo as extension_codigo, extension_universitaria.nombre as extension_nombre, 
unidad_academica.id, unidad_academica.codigo as unidad_codigo, unidad_academica.nombre as unidad_nombre
from carrera inner join extension_universitaria on carrera.id_eu = extension_universitaria.id
inner join unidad_academica on unidad_academica.id = extension_universitaria.id_ua
where carrera.id = 1;


select * from asignatura  where codigo_carrera = 1;
select * from asignatura where id = 1;

select *
from carrera inner join extension_universitaria on carrera.id_eu = extension_universitaria.id
inner join unidad_academica on unidad_academica.id = extension_universitaria.id_ua
where carrera.id = 1;

update solicitud set resultado = "aprobado" where id = 3;
select * from solicitud;
delete from solicitud where id = 7;
-- conteo solicitudes
(select "NO" as "finalizado", count(*) from solicitud where resultado IS NULL)
union
(select "SI" as "finalizado", count(*) from solicitud where resultado IS NOT NULL);

select * from solicitud where resultado IS NULL;
select * from solicitud where resultado IS NOT NULL;

drop table detalle_solicitud;
drop table solicitud;
drop table equivalencia;
drop table asignatura;
drop table homologacion;
drop table carrera;
drop table extension_universitaria;
drop table unidad_academica;

drop table estudiante;
drop table detalle_permiso;
drop table permiso;
drop table administrador;
truncate table solicitud;
truncate table detalle_solicitud;
truncate table detalle_previo;
truncate table previo;