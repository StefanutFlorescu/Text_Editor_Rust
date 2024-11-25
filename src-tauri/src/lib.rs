use std::fs;

use rfd::FileDialog;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

#[tauri::command]
fn open() -> Option<String> {
    Some(
        FileDialog::new()
            .add_filter("text", &["txt", "rs"])
            .add_filter("rust", &["rs", "toml"])
            .set_directory("/")
            .pick_file()?
            .to_str()?
            .to_owned(),
    )
}

#[tauri::command]
fn load(path: String) -> Result<String, String> {
    fs::read_to_string(path).map_err(|e| format!("Failed to read file due to {}", e))
}

#[tauri::command]
fn save_to_file(input: String, file_path: String) -> Result<(), String> {
    let path = Path::new(&file_path); // &file_path automatically coerces to &str
    File::create(path)
        .and_then(|mut file| file.write_all(input.as_bytes())) // write input to file
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![open,load,save_to_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
