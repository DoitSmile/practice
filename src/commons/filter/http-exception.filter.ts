import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException) // 에러관련 내용이 있다는 걸  NestJs에게 알려주는 데코레이터
export class HttpExceptionFilter implements ExceptionFilter {
  // HttpExceptionFilter: 인터페이스, catch 함수가 반드시 존재해야함 그렇지 않을 경우, 에러발생
  // implements: interface 상속, extends와 다르게 오버라이딩 필요
  //ExceptionFilter는 class type지정을 위해 가져옴
  catch(exception: HttpException) {
    // 예외상황 발생시, 비지니스로직에 try-catch문이 없어도 자동으로 에러가 catch문으로 들어옴
    const status = exception.getStatus();
    const message = exception.message;
    console.log('예외발생');
    console.log('예외내용:', message);
    console.log('예외코드:', status);
  }
}
