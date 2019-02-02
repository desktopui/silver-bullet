open Revery;
open Revery.Core;
open Revery.UI;
open Revery.UI.Components;

module SignInButton = {
  let component = React.component("SignInButton");

  let wrapperStyle =
    Style.make(
      ~backgroundColor=Color.rgba(1., 1., 1., 0.1),
      ~border=Style.Border.make(~width=2, ~color=Colors.white, ()),
      ~margin=16,
      (),
    );

  let textHeaderStyle =
    Style.make(
      ~color=Colors.white,
      ~fontFamily="Lato-Regular.ttf",
      ~fontSize=20,
      ~margin=4,
      (),
    );

  let debug = () => print_string("hello world");

  let make = (~name) =>
    component(slots =>
      <Clickable>
        <View style=wrapperStyle>
          <Text style=textHeaderStyle text=name />
        </View>
      </Clickable>
    );

  let createElement = (~children as _, ~name, ()) =>
    React.element(make(~name));
};