import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVersionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    enviromentId: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    changeLog?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    branchName?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    attachmentFile?: string;

    @ApiPropertyOptional()
    @IsDate()
    @IsOptional()
    releaseDate?: Date

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isActive?: Boolean;
}
