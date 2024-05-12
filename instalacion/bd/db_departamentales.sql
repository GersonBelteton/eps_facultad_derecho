create database if not exists departamentales;

use departamentales; 

drop table if exists estudiante;
drop table if exists detalle_solicitud;
drop table if exists detalle_previo;
drop table if exists detalle_permiso;
drop table if exists equivalencia;
drop table if exists homologacion;
drop table if exists previo;
drop table if exists permiso;
drop table if exists solicitud;
drop table if exists autorizacion;
drop table if exists asignatura;
drop table if exists carrera;
drop table if exists extension_universitaria;
drop table if exists unidad_academica;
drop table if exists administrador;


create table administrador(
	id int primary key auto_increment,
    nombre_completo varchar(100) not null,
    usuario varchar(50) not null,
    contrasena varchar(50) not null,
    permiso_usuarios boolean,
    permiso_equivalencias boolean,
    permiso_expedientes boolean
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
create table asignatura (
	id int primary key auto_increment,
    nombre varchar(100) not null,
    codigo_carrera int not null,
    codigo_asignatura varchar(3),
    foreign key(codigo_carrera) references carrera(id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);
create table autorizacion(
	id int primary key auto_increment,
    tipo varchar(50) not null,
    descripcion varchar(200),
    punto_a varchar(25),
    acta_a varchar(25),
    inciso_a varchar(25),
	punto_ia varchar(25),
    acta_ia varchar(25),
    inciso_ia varchar(25),
    fecha_ia varchar(50),
    fecha_a varchar(50),
	id_unidad int not null,
	foreign key(id_unidad) references unidad_academica(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
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
    cohorte	integer,
    codigo_carrera int not null,
    foreign key(codigo_carrera) references carrera(id)
    
);
create table permiso (
	id int primary key auto_increment,
    permiso varchar(50) not null
);
create table previo(
	id int primary key auto_increment,
    descripcion varchar(500)
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
create table equivalencia (
	id int primary key auto_increment,
    codigo_asignatura1 int not null,
    codigo_asignatura2 int not null,
    foreign key(codigo_asignatura1) references asignatura(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
	foreign key(codigo_asignatura2) references asignatura(id)
    ON DELETE CASCADE ON UPDATE CASCADE
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
create table detalle_previo(
	id int primary key auto_increment,
    id_previo int not null,
    id_solicitud int not null,
	foreign key(id_previo) references previo(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(id_solicitud) references solicitud(id)
    ON DELETE CASCADE ON UPDATE CASCADE
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