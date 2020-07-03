import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginMainBodyScreen from '../Containers/LoginMainBodyScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import LoginScreen from '../Containers/LoginScreen';
import MainBodyScreen from '../Containers/MainBodyScreen';
import AuthLoadingScreen from '../Containers/AuthLoadingScreen';
import HomeTab_CourseScreen from '../Containers/HomeTab_CourseScreen';
import CourseScreen from '../Containers/CourseScreen';
import Course_LearnScreen from '../Containers/Course_LearnScreen';
import Course_RememberCardScreen from '../Containers/Course_RememberCardScreen';
import Course_WriteScreen from '../Containers/Course_WriteScreen';
import Course_TestScreen from '../Containers/Course_TestScreen';
import Course_Test_ResultScreen from '../Containers/Course_Test_ResultScreen';
import AddTab_CourseScreen from '../Containers/AddTab_CourseScreen';
import AddTab_ClassScreen from '../Containers/AddTab_ClassScreen';
import ClassScreen from '../Containers/ClassScreen';
import Course_IntoClassScreen from '../Containers/Course_IntoClassScreen';
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
                HomeTab_CourseScreen: { screen: HomeTab_CourseScreen },
                CourseScreen: { screen: CourseScreen },
                Course_LearnScreen: { screen: Course_LearnScreen },
                Course_RememberCardScreen: { screen: Course_RememberCardScreen },
                Course_WriteScreen: { screen: Course_WriteScreen },
                Course_TestScreen: { screen: Course_TestScreen },
                Course_Test_ResultScreen: { screen: Course_Test_ResultScreen },
                AddTab_CourseScreen: { screen: AddTab_CourseScreen },
                AddTab_ClassScreen: { screen: AddTab_ClassScreen },
                ClassScreen: { screen: ClassScreen },
                Course_IntoClassScreen: { screen: Course_IntoClassScreen },
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
