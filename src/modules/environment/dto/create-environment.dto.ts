import { EnvironmentType } from "@/common/enum";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEnvironmentDto {
    @IsString()
    @IsNotEmpty()
    projectId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(EnvironmentType)
    @IsOptional()
    type: EnvironmentType;

    @IsBoolean()
    @IsOptional()
    isActive: Boolean;
}
