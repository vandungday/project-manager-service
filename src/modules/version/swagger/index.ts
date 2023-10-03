import { ApiProperty } from '@nestjs/swagger';

export class GetVersions {
    @ApiProperty()
    readonly versions = [{}];

    @ApiProperty()
    readonly total: number;

    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly pages: number;

    @ApiProperty()
    readonly limit: number;
}