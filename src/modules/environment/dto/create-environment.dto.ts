import { EnvironmentType } from "@/common/enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEnvironmentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    projectId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional()
    @IsEnum(EnvironmentType)
    @IsOptional()
    type: EnvironmentType;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isActive: Boolean;
}
