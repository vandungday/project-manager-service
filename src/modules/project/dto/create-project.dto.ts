import { IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsDate()
    @IsOptional()
    timeEnd?: Date;
}
