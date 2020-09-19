
-- CREATE DATABASE AutenthicationDB;

CREATE TABLE [dbo].[User] (
    [Id]        INT     primary key   IDENTITY (1, 1) NOT NULL,
    [Email]     VARCHAR (200) NULL,
    [FirstName] VARCHAR (200) NULL,
    [LastName]  VARCHAR (200) NULL,
    [Roles]     VARCHAR (200) NULL,
    [Password]  VARCHAR (200) NULL
);
GO

CREATE PROCEDURE [dbo].[ValidateUser]  
@email varchar(100),  
@password varchar(20) 
AS 
BEGIN  
SELECT [Id],[Email],[FirstName],[LastName] ,[Roles]  
FROM [dbo].[User]  
WHERE [Email]=@email AND [Password]=@password 
END
GO
