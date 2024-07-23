import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entites/user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('password') password: string,
    @Args('age') age: number,
    @Args('email') email: string,
  ): Promise<User> {
    return await this.userService.createUser({ name, password, age, email });
  }
}
