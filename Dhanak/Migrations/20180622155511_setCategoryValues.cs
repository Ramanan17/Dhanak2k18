using Microsoft.EntityFrameworkCore.Migrations;

namespace Dhanak.Migrations
{
    public partial class setCategoryValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"SET IDENTITY_INSERT [dbo].[Category] ON
INSERT INTO [dbo].[Category] ([Id], [Name]) VALUES (1, N'category1')
INSERT INTO [dbo].[Category] ([Id], [Name]) VALUES (2, N'category2')
INSERT INTO [dbo].[Category] ([Id], [Name]) VALUES (3, N'category3')
INSERT INTO [dbo].[Category] ([Id], [Name]) VALUES (4, N'category4')
SET IDENTITY_INSERT [dbo].[Category] OFF");
            migrationBuilder.Sql(@"SET IDENTITY_INSERT [dbo].[Events] ON
INSERT INTO [dbo].[Events] ([Id], [EventName], [OrganizerName], [OrganizerEmail], [OrganizerPhone], [CoOrdinatorName], [CoOrdinatorPhone], [CategoryId], [Description]) VALUES (2, N'beg borrow steal', N'dfdf', N'dfdfdf', N'dfdfdf', N'dfdfdfdf', N'dffdfd', 1, N'dvdvdvdv')
INSERT INTO [dbo].[Events] ([Id], [EventName], [OrganizerName], [OrganizerEmail], [OrganizerPhone], [CoOrdinatorName], [CoOrdinatorPhone], [CategoryId], [Description]) VALUES (3, N'Dostana', N'rmanan', N'erjeirj', N'ejoejoj', N'wwjowjrow', N'wojworjo', 2, N'oddjwojfo')
INSERT INTO [dbo].[Events] ([Id], [EventName], [OrganizerName], [OrganizerEmail], [OrganizerPhone], [CoOrdinatorName], [CoOrdinatorPhone], [CategoryId], [Description]) VALUES (4, N'webbed', N'ramanan', N'email', N'jefojeojf', N'ojfeofjeo', N'eojfoejfeofj', 2, N'dojfojfofje')
SET IDENTITY_INSERT [dbo].[Events] OFF
");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
