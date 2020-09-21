
-- CREATE DATABASE AutenthicationDB;

CREATE TABLE [dbo].[User] (
    [Id]        INT     primary key   IDENTITY (1, 1) NOT NULL,
    [NickName]  VARCHAR (200) NULL,
    [Email]     VARCHAR (200) NULL,
    [FirstName] VARCHAR (200) NULL,
    [LastName]  VARCHAR (200) NULL,
    [Roles]     VARCHAR (200) NULL,
    [Password]  VARCHAR (200) NULL
);
GO

CREATE PROCEDURE [dbo].[ValidateUser]  
@nickname varchar(200),  
@password varchar(20) 
AS 
BEGIN  
SELECT [Id],[NickName],[Email],[FirstName],[LastName] ,[Roles]  
FROM [dbo].[User]  
WHERE [NickName]=@nickname AND [Password]=@password 
END
GO


--select * from [User]
-- insert into [user](NickName,Email,FirstName,LastName,Roles,[Password]) VALUES('GermanSilva','Germansilva@javeriana.edu.co','German','Silva','admin','123456')
