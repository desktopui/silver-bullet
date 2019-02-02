open Revery;
open Revery.Core;
open Revery.UI;
open Revery.UI.Components;
open SignInButton;

let init = app => {
  
  let win = App.createWindow(app, "Revery ChatApp");

  let render = () =>
    <View
      style={Style.make(
        ~position=LayoutTypes.Absolute,
        ~justifyContent=LayoutTypes.JustifyCenter,
        ~alignItems=LayoutTypes.AlignCenter,
        ~bottom=0,
        ~top=0,
        ~left=0,
        ~right=0,
        (),
      )}>
      <View
        style={Style.make(~flexDirection=Row, ~alignItems=AlignCenter, ())} />
        <SignInButton name="Sign in with Slack" />
      </View>
    </View>;

  UI.start(win, render);
};

App.start(init);
