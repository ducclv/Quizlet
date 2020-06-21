import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginMainBodyScreen from '../Containers/LoginMainBodyScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import LoginScreen from '../Containers/LoginScreen';
import MainBodyScreen from '../Containers/MainBodyScreen';
import AuthLoadingScreen from '../Containers/AuthLoadingScreen';
import HomeTab_CoursesScreen from '../Containers/HomeTab_CoursesScreen';
import CourseScreen from '../Containers/CourseScreen';
import Course_LearnScreen from '../Containers/Course_LearnScreen';
import Course_RememberCardScreen from '../Containers/Course_RememberCardScreen';

const AuthStack = createStackNavigator(
        {
                LoginMainBodyScreen: { screen: LoginMainBodyScreen },
                RegisterScreen: { screen: RegisterScreen },
                LoginScreen: { screen: LoginScreen },
        },
        {
                initialRouteName: 'LoginMainBodyScreen',
                defaultNavigationOptions: { headerShown: false }
        }
);

const AppNavigator = createStackNavigator(
        {
                MainBodyScreen: { screen: MainBodyScreen },
                HomeTab_CoursesScreen: { screen: HomeTab_CoursesScreen },
                CourseScreen: { screen: CourseScreen },
                Course_LearnScreen: { screen: Course_LearnScreen },
                Course_RememberCardScreen: { screen: Course_RememberCardScreen },
        },
        {
                initialRouteName: 'MainBodyScreen',
                defaultNavigationOptions: { headerShown: false }
        }
);

export default createAppContainer(
        createSwitchNavigator(
                {
                        AuthLoading: AuthLoadingScreen,
                        App: AppNavigator,
                        Auth: AuthStack,
                },
                {
                        initialRouteName: 'AuthLoading',
                },
        ),
);
