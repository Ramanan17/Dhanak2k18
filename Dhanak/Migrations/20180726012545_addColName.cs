using Microsoft.EntityFrameworkCore.Migrations;

namespace Dhanak.Migrations
{
    public partial class addColName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColName",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColName",
                table: "Users");
        }
    }
}
