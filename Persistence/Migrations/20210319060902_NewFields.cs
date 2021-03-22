using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class NewFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Computers");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Computers");

            migrationBuilder.RenameColumn(
                name: "Venue",
                table: "Computers",
                newName: "processor");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Computers",
                newName: "fromFactor");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Computers",
                newName: "brand");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Computers",
                newName: "Type");

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "Computers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ramSlotsNum",
                table: "Computers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "usbNum",
                table: "Computers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "quantity",
                table: "Computers");

            migrationBuilder.DropColumn(
                name: "ramSlotsNum",
                table: "Computers");

            migrationBuilder.DropColumn(
                name: "usbNum",
                table: "Computers");

            migrationBuilder.RenameColumn(
                name: "processor",
                table: "Computers",
                newName: "Venue");

            migrationBuilder.RenameColumn(
                name: "fromFactor",
                table: "Computers",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "brand",
                table: "Computers",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Computers",
                newName: "City");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Computers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Computers",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
