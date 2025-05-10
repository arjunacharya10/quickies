// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;
mod fns;
mod tray;

use tauri::Manager;
use tauri_plugin_deep_link::DeepLinkExt;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            command::init,
            command::show_menubar_panel
        ])
        .plugin(tauri_nspanel::init())
        .setup(|app| {
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            app.deep_link().on_open_url(|event| {
                println!("Deep link URLs: {:?}", event.urls());
            });

            use tauri_plugin_global_shortcut::{
                Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState,
            };

            let ctrl_n_shortcut = Shortcut::new(Some(Modifiers::CONTROL), Code::KeyL);
            app.handle().plugin(
                tauri_plugin_global_shortcut::Builder::new()
                    .with_handler(move |_app, shortcut, event| {
                        println!("{:?}", shortcut);
                        if shortcut == &ctrl_n_shortcut {
                            match event.state() {
                                ShortcutState::Pressed => {
                                    println!("Ctrl-N Pressed!");
                                }
                                ShortcutState::Released => {
                                    println!("Ctrl-N Released!");
                                }
                            }
                        }
                    })
                    .build(),
            )?;
            app.global_shortcut().register(ctrl_n_shortcut)?;

            let app_handle = app.app_handle();

            tray::create(app_handle)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
