using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Paymentadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentIntentId",
                table: "OrdersTBL",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientSecret",
                table: "BasketsTBL",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentIntentId",
                table: "BasketsTBL",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "3414842f-7168-427c-b607-b88d70e1bbdc");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "a3dfa660-5912-4c50-a97e-7541fc5b8bd3");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentIntentId",
                table: "OrdersTBL");

            migrationBuilder.DropColumn(
                name: "ClientSecret",
                table: "BasketsTBL");

            migrationBuilder.DropColumn(
                name: "PaymentIntentId",
                table: "BasketsTBL");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "86b03b7c-e2ad-469a-937d-daf4e54ffa20");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "3f4584a2-eb56-4e5c-b77b-aafcb224c03c");
        }
    }
}
