import { gql } from 'apollo-server-express';

export const auth = gql`
    type User {
        email: String!
    }

    input SignUpInput {
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    extend type Query {
        me: User!
    }

    extend type Mutation {
        signUp(input: SignUpInput): User!
        login(input: LoginInput): User!
    }
`;
