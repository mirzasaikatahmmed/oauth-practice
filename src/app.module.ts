import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleOauthModule } from 'nestjs-google-oauth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwitterOauthModule } from 'nestjs-twitter-oauth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleOauthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        clientId: configService.get<string>('GOOGLE_CLIENT_ID') || '',
        clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
        callbackUrl: configService.get<string>('GOOGLE_CALLBACK_URL') || '',
      }),
      inject: [ConfigService],
    }) as any,

    TwitterOauthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        clientId: configService.get<string>('TWITTER_CLIENT_ID') || '',
        clientSecret: configService.get<string>('TWITTER_CLIENT_SECRET') || '',
        callbackUrl: configService.get<string>('TWITTER_CALLBACK_URL') || '',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
